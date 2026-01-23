import 'package:dartz/dartz.dart';
import '../../../../core/errors/failures.dart';
import '../entities/product_entity.dart';

/// Interface do Repositório - Define o CONTRATO
/// A implementação real fica na camada de DATA
abstract class ProductRepository {
  /// Busca todos os produtos
  Future<Either<Failure, List<ProductEntity>>> getProducts();

  /// Busca produto por ID
  Future<Either<Failure, ProductEntity>> getProductById(String id);

  /// Busca produtos por categoria
  Future<Either<Failure, List<ProductEntity>>> getProductsByCategory(
    String category,
  );
}
