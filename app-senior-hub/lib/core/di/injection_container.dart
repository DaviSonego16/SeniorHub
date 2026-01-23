import 'package:get_it/get_it.dart';
import 'package:dio/dio.dart';
import 'package:shared_preferences/shared_preferences.dart';

// Feature: Products
import '../../features/animes/data/datasources/product_local_datasource.dart';
import '../../features/animes/data/datasources/product_remote_datasource.dart';
import '../../features/animes/data/repositories/product_repository_impl.dart';
import '../../features/animes/domain/repositories/product_repository.dart';
import '../../features/animes/domain/usecases/get_products_usecase.dart';
import '../../features/animes/domain/usecases/get_product_by_id_usecase.dart';
import '../../features/animes/presentation/bloc/product_bloc.dart';

final sl = GetIt.instance;

Future<void> init() async {
  // ========== Features ==========

  // Products Feature
  _initProductsFeature();

  // ========== External ==========
  final sharedPreferences = await SharedPreferences.getInstance();
  sl.registerLazySingleton(() => sharedPreferences);

  sl.registerLazySingleton(
    () => Dio(
      BaseOptions(
        baseUrl: 'https://fakestoreapi.com', // API de exemplo
        connectTimeout: const Duration(seconds: 30),
        receiveTimeout: const Duration(seconds: 30),
      ),
    ),
  );
}

/// Inicializa a feature de Products
void _initProductsFeature() {
  // BLoC
  sl.registerFactory(
    () => ProductBloc(getProductsUseCase: sl(), getProductByIdUseCase: sl()),
  );

  // Use Cases
  sl.registerLazySingleton(() => GetProductsUseCase(sl()));
  sl.registerLazySingleton(() => GetProductByIdUseCase(sl()));

  // Repository
  sl.registerLazySingleton<ProductRepository>(
    () => ProductRepositoryImpl(remoteDataSource: sl(), localDataSource: sl()),
  );

  // Data Sources
  sl.registerLazySingleton<ProductRemoteDataSource>(
    () => ProductRemoteDataSourceImpl(sl()),
  );

  sl.registerLazySingleton<ProductLocalDataSource>(
    () => ProductLocalDataSourceImpl(sl()),
  );
}
