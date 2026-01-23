import 'package:flutter_bloc/flutter_bloc.dart';
import '../../domain/usecases/get_products_usecase.dart';
import '../../domain/usecases/get_product_by_id_usecase.dart';
import 'product_event.dart';
import 'product_state.dart';

/// BLoC - Business Logic Component
/// Gerencia o estado e conecta UI aos Use Cases
class ProductBloc extends Bloc<ProductEvent, ProductState> {
  final GetProductsUseCase getProductsUseCase;
  final GetProductByIdUseCase getProductByIdUseCase;

  ProductBloc({
    required this.getProductsUseCase,
    required this.getProductByIdUseCase,
  }) : super(const ProductInitial()) {
    // Registra os handlers para cada evento
    on<LoadProductsEvent>(_onLoadProducts);
    on<LoadProductByIdEvent>(_onLoadProductById);
    on<FilterProductsByCategoryEvent>(_onFilterByCategory);
  }

  /// Handler: Carregar produtos
  Future<void> _onLoadProducts(
    LoadProductsEvent event,
    Emitter<ProductState> emit,
  ) async {
    emit(const ProductLoading());

    final result = await getProductsUseCase();

    result.fold(
      (failure) => emit(ProductError(failure.message)),
      (products) => emit(ProductsLoaded(products)),
    );
  }

  /// Handler: Carregar produto por ID
  Future<void> _onLoadProductById(
    LoadProductByIdEvent event,
    Emitter<ProductState> emit,
  ) async {
    emit(const ProductLoading());

    final result = await getProductByIdUseCase(event.productId);

    result.fold(
      (failure) => emit(ProductError(failure.message)),
      (product) => emit(ProductLoaded(product)),
    );
  }

  /// Handler: Filtrar por categoria
  Future<void> _onFilterByCategory(
    FilterProductsByCategoryEvent event,
    Emitter<ProductState> emit,
  ) async {
    emit(const ProductLoading());

    final result = await getProductsUseCase();

    result.fold((failure) => emit(ProductError(failure.message)), (products) {
      final filtered = products
          .where((p) => p.category == event.category)
          .toList();
      emit(ProductsLoaded(filtered));
    });
  }
}
