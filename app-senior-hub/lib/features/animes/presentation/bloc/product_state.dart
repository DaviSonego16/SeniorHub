import 'package:equatable/equatable.dart';
import '../../domain/entities/product_entity.dart';

/// Estados possíveis da tela
abstract class ProductState extends Equatable {
  const ProductState();

  @override
  List<Object?> get props => [];
}

/// Estado inicial
class ProductInitial extends ProductState {
  const ProductInitial();
}

/// Estado de carregamento
class ProductLoading extends ProductState {
  const ProductLoading();
}

/// Estado de sucesso com lista de produtos
class ProductsLoaded extends ProductState {
  final List<ProductEntity> products;

  const ProductsLoaded(this.products);

  @override
  List<Object?> get props => [products];
}

/// Estado de sucesso com produto único
class ProductLoaded extends ProductState {
  final ProductEntity product;

  const ProductLoaded(this.product);

  @override
  List<Object?> get props => [product];
}

/// Estado de erro
class ProductError extends ProductState {
  final String message;

  const ProductError(this.message);

  @override
  List<Object?> get props => [message];
}
