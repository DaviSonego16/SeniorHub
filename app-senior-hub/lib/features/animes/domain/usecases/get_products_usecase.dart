import 'package:dartz/dartz.dart';
import '../../../../core/errors/failures.dart';
import '../entities/product_entity.dart';
import '../repositories/product_repository.dart';

/// Use Case - Encapsula a lógica de negócio
/// Cada use case tem UMA única responsabilidade
class GetProductsUseCase {
  final ProductRepository repository;

  GetProductsUseCase(this.repository);

  /// Executa o caso de uso
  Future<Either<Failure, List<ProductEntity>>> call() async {
    return await repository.getProducts();
  }
}
