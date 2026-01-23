import 'package:dartz/dartz.dart';
import '../../../../core/errors/failures.dart';
import '../../domain/entities/product_entity.dart';
import '../../domain/repositories/product_repository.dart';
import '../datasources/product_local_datasource.dart';
import '../datasources/product_remote_datasource.dart';

/// Implementação do Repositório
/// Orquestra os DataSources (local e remoto)
/// Decide de onde buscar os dados
class ProductRepositoryImpl implements ProductRepository {
  final ProductRemoteDataSource remoteDataSource;
  final ProductLocalDataSource localDataSource;

  ProductRepositoryImpl({
    required this.remoteDataSource,
    required this.localDataSource,
  });

  @override
  Future<Either<Failure, List<ProductEntity>>> getProducts() async {
    try {
      // Tenta buscar da API
      final remoteProducts = await remoteDataSource.getProducts();

      // Salva no cache
      await localDataSource.cacheProducts(remoteProducts);

      return Right(remoteProducts);
    } catch (e) {
      // Se falhar, tenta buscar do cache
      try {
        final cachedProducts = await localDataSource.getCachedProducts();
        return Right(cachedProducts);
      } catch (cacheError) {
        return const Left(ServerFailure('Erro ao buscar produtos'));
      }
    }
  }

  @override
  Future<Either<Failure, ProductEntity>> getProductById(String id) async {
    try {
      final product = await remoteDataSource.getProductById(id);
      return Right(product);
    } catch (e) {
      return const Left(ServerFailure('Erro ao buscar produto'));
    }
  }

  @override
  Future<Either<Failure, List<ProductEntity>>> getProductsByCategory(
    String category,
  ) async {
    try {
      final products = await remoteDataSource.getProducts();
      final filteredProducts = products
          .where((p) => p.category == category)
          .toList();
      return Right(filteredProducts);
    } catch (e) {
      return const Left(ServerFailure('Erro ao buscar produtos por categoria'));
    }
  }
}
