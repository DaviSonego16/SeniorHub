import 'package:equatable/equatable.dart';

/// Eventos que a UI pode disparar
abstract class ProductEvent extends Equatable {
  const ProductEvent();

  @override
  List<Object?> get props => [];
}

/// Evento: Carregar todos os produtos
class LoadProductsEvent extends ProductEvent {
  const LoadProductsEvent();
}

/// Evento: Carregar produto específico
class LoadProductByIdEvent extends ProductEvent {
  final String productId;

  const LoadProductByIdEvent(this.productId);

  @override
  List<Object?> get props => [productId];
}

/// Evento: Filtrar por categoria
class FilterProductsByCategoryEvent extends ProductEvent {
  final String category;

  const FilterProductsByCategoryEvent(this.category);

  @override
  List<Object?> get props => [category];
}
