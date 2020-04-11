import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, StatusBar, FlatList, SafeAreaView, TouchableOpacity} from 'react-native'
import api from './services/api'

export default function App(){
    const [repositories, setRepositories] = useState([])

    useEffect(() => {
        api.get('repositories').then(response => {
            setRepositories(response.data)})
    }, [])

    async function handleLike(id){
        
        var response = await api.post(`repositories/${id}/like`)

        const repositoryIndex = repositories.findIndex(repository => repository.id === id)

        var repos = [...repositories]

        repos[repositoryIndex] = response.data

        setRepositories(repos)
    }
    
    return (
        <>
        <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
        <SafeAreaView style={styles.container}>
        <FlatList
        data={repositories}
        keyExtractor={repository => repository.id}
        renderItem={({item}) => (
            <View style={styles.repositoryContainer}>
            <Text style={styles.texto}>{item.title}</Text>
              
              {item.techs.map(array => 
              <View key={array} style={styles.techsContainer}>
                  <Text key={array} style={styles.tech}>{array}</Text>
              </View>
              )}
              
  
            <View style={styles.likesContainer}>
              <Text
                style={styles.likeText}
                // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                testID={`repository-likes-${item.id}`}
              >
                {item.likes} {item.likes === 1 ? 'curtida' : 'curtidas'}
              </Text>
              
            </View>
            <TouchableOpacity
            style={styles.button}
            onPress={() => handleLike(item.id)}
            // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
            testID={`like-button-${item.id}`}
          >
            <Text style={styles.buttonText}>Curtir</Text>
          </TouchableOpacity>
          </View>
        )}/>

        </SafeAreaView>
      </>
)
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#7159c1",
      borderRadius: 15
    },
    repositoryContainer: {
      marginBottom: 15,
      marginHorizontal: 15,
      backgroundColor: "#fff",
      borderRadius: 15,
      padding: 20,
      borderRadius: 15
    },
    repository: {
      fontSize: 32,
      fontWeight: "bold",
      borderRadius: 15
    },
    techsContainer: {
      flexDirection: "row",
      marginTop: 10,
      borderRadius: 15
    },
    tech: {
      fontSize: 12,
      fontWeight: "bold",
      marginRight: 10,
      backgroundColor: "#04d361",
      paddingHorizontal: 10,
      paddingVertical: 5,
      color: "#fff",
      borderRadius: 15
    },
    likesContainer: {
      marginTop: 15,
      flexDirection: "row",
      justifyContent: "space-between",
      borderRadius: 15
    },
    likeText: {
      fontSize: 14,
      fontWeight: "bold",
      marginRight: 10,
    },
    button: {
      marginTop: 10,
      borderRadius: 10
    },
    buttonText: {
      fontSize: 14,
      fontWeight: "bold",
      marginRight: 10,
      color: "#fff",
      backgroundColor: "#7159c1",
      padding: 15,
    },
  });


