import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useContext, useState, useEffect, useMemo } from 'react'
import { AppContext } from '../AppContext'
import AxiosInstance from '../../helper/AxiosInstance'

const Favorite = () => {
  const { favorite } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  console.log(products);
  useMemo(() => {
    const fetchData = async () => {
      try {
        // Tạo một mảng các promise từ các yêu cầu API
        const promises = favorite.map(async (item) => {
          const response = await AxiosInstance().get(`/products/${item}`);
          // console.log(response.product);
          return { item: response.product, number: item.number};
        });

        // Chờ tất cả các promise hoàn thành
        const productsData = await Promise.all(promises);

        // Cập nhật state với dữ liệu từ API
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchData();
  }, [favorite]);

  return (
    <View style={styles.container}>
      <Text>Favorite Items:</Text>
      <View>
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <View style={styles.productContainer}>
              <Text style={{ color: '#fff' }}>name: {item?.item.name}</Text>
              <Text style={{ color: '#fff' }}>price: {item?.item.price}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  container: {
    backgroundColor: '#0C0F14',
    width: '100%',
    height: '100%',
    paddingHorizontal: 30,
    paddingVertical: 20,
  }
});

export default Favorite;
