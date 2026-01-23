import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';
import '../models/product_model.dart';

/// Interface do DataSource Local
abstract class ProductLocalDataSource {
  Future<List<ProductModel>> getCachedProducts();
  Future<void> cacheProducts(List<ProductModel> products);
}

/// Implementação do DataSource Local
/// Responsável pelo cache local (SharedPreferences, SQLite, etc)
class ProductLocalDataSourceImpl implements ProductLocalDataSource {
  final SharedPreferences sharedPreferences;
  static const String cachedProductsKey = 'CACHED_PRODUCTS';

  ProductLocalDataSourceImpl(this.sharedPreferences);

  @override
  Future<List<ProductModel>> getCachedProducts() async {
    final jsonString = sharedPreferences.getString(cachedProductsKey);

    if (jsonString != null) {
      final List<dynamic> jsonList = json.decode(jsonString);
      return jsonList.map((json) => ProductModel.fromJson(json)).toList();
    } else {
      throw Exception('Nenhum cache encontrado');
    }
  }

  @override
  Future<void> cacheProducts(List<ProductModel> products) async {
    final jsonList = products.map((product) => product.toJson()).toList();
    await sharedPreferences.setString(cachedProductsKey, json.encode(jsonList));
  }
}
