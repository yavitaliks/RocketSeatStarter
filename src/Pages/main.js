import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import api from "../services/api";

export default function Main({ navigation: { navigate } }) {
  const [data, setDatas] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  async function getIndex() {
    if (loading) {
      return;
    }
    if (total > 0 && data == total) {
      return;
    }
    setLoading(true);
    try {
      const response = await api.get(`/products?page=${page}`);
      console.log("RESPONSE", response.data);
      setDatas([...data, ...response.data.docs]);
      setTotal(response.data.total);
      setPage(page + 1);
      setLoading(false);
      console.log("Total", response.data.total);
    } catch (erro) {
      console.log("ERROOORR", erro);
    }
  }

  useEffect(() => {
    getIndex();
  }, []);

  return (
    <View style={style.container}>
      <FlatList
        contentContainerStyle={style.list}
        onEndReached={getIndex}
        onEndReachedThreshold={0.2}
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={style.productContainer}>
            <Text style={style.productTitle}>{item.title}</Text>
            <Text style={style.productDesc}>{item.description}</Text>
            <TouchableOpacity
              style={style.button}
              onPress={() => {
                navigate("Product", { product: item.url });
              }}
            >
              <Text style={style.link}> Acessar </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  list: {
    padding: 20,
  },
  productContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  productDesc: {
    fontSize: 16,
    color: "#999",
    marginTop: 5,
    lineHeight: 24,
  },
  link: {
    fontSize: 16,
    color: "#837FFF",
    fontWeight: "bold",
  },
  button: {
    height: 42,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#837FFF",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
});
