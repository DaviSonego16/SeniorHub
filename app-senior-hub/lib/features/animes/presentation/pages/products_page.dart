import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../../core/constants/app_spacing.dart';
import '../../../../core/di/injection_container.dart';
import '../../../../shared/widgets/loading_widget.dart';
import '../../../../shared/widgets/error_widget.dart';
import '../bloc/product_bloc.dart';
import '../bloc/product_event.dart';
import '../bloc/product_state.dart';
import '../widgets/product_card.dart';

class ProductsPage extends StatelessWidget {
  const ProductsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => sl<ProductBloc>()..add(const LoadProductsEvent()),
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Produtos'),
          actions: [
            IconButton(
              icon: const Icon(Icons.filter_list),
              onPressed: () => _showFilterDialog(context),
            ),
          ],
        ),
        body: BlocBuilder<ProductBloc, ProductState>(
          builder: (context, state) {
            if (state is ProductLoading) {
              return const LoadingWidget(message: 'Carregando produtos...');
            }

            if (state is ProductError) {
              return CustomErrorWidget(
                message: state.message,
                onRetry: () {
                  context.read<ProductBloc>().add(const LoadProductsEvent());
                },
              );
            }

            if (state is ProductsLoaded) {
              if (state.products.isEmpty) {
                return const Center(child: Text('Nenhum produto encontrado'));
              }

              return RefreshIndicator(
                onRefresh: () async {
                  context.read<ProductBloc>().add(const LoadProductsEvent());
                },
                child: ListView.builder(
                  padding: const EdgeInsets.all(AppSpacing.paddingPage),
                  itemCount: state.products.length,
                  itemBuilder: (context, index) {
                    final product = state.products[index];
                    return ProductCard(
                      product: product,
                      onTap: () {
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(content: Text('Produto: ${product.name}')),
                        );
                      },
                    );
                  },
                ),
              );
            }

            return const Center(child: Text('Estado desconhecido'));
          },
        ),
      ),
    );
  }

  void _showFilterDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (dialogContext) => AlertDialog(
        title: const Text('Filtrar por Categoria'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            _filterOption(context, 'Eletrônicos', 'eletronicos'),
            _filterOption(context, 'Roupas', 'roupas'),
            _filterOption(context, 'Livros', 'livros'),
            _filterOption(context, 'Todos', null),
          ],
        ),
      ),
    );
  }

  Widget _filterOption(BuildContext context, String label, String? category) {
    return ListTile(
      title: Text(label),
      onTap: () {
        Navigator.pop(context);
        if (category != null) {
          context.read<ProductBloc>().add(
            FilterProductsByCategoryEvent(category),
          );
        } else {
          context.read<ProductBloc>().add(const LoadProductsEvent());
        }
      },
    );
  }
}
