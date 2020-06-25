import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, ViewStyle, Image, ImageStyle, ScrollView, FlatList } from 'react-native'
import { marvelAPI } from '../api';

interface Props {
    item?: any
}

const Detail: React.SFC<Props> = (props) => {
    const [comics, setComics] = useState([]);
    console.log('--->', props);
    
    useEffect(() => {
        marvelAPI.getComicById(props.item.id,{limit:10,dateRange:'2005-01-01,2020-01-01'}).then((response)=>{
            setComics(response.data.data.results)
       })
    });

    return (
        <ScrollView>
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={{ uri: `${props.item.thumbnail.path}.${props.item.thumbnail.extension}` }}
                />
                <Text style={[styles.title,styles.item]}>{`Adi: ${props.item.name}`}</Text>
                <Text style={[styles.description,styles.item]}>{`${props.item.description}`}</Text>
                <Text style={[styles.title,styles.item]}>{`Yer aldığı çizgi romanlar`}</Text>
                <FlatList
                    data={comics}
                    style={{marginTop:10}}
                    renderItem={({ item }: any) => (
                        <View style={{ flex: 1, flexDirection: 'column', margin: 5 }}>
                        <Image   style={{height:100,width:100}} source={{ uri: `${item.thumbnail.path}.${item.thumbnail.extension}` }} />
                       
                        </View>
                    )}

                    numColumns={3}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </ScrollView>
    )
}
interface Style {
    container: ViewStyle;
    image: ImageStyle;
    title: ViewStyle;
    description: ViewStyle;
    item:ViewStyle;
}

const styles = StyleSheet.create<Style>({
    container: {
        padding: 10
    },
    image: {
        height: 250,
        width: '100%'
    },
    title:{
        fontWeight: 'bold',
        fontSize: 16
    },
    description:{
        fontWeight: 'normal',
        fontSize: 14
    },
    item:{
        marginVertical: 5
    }
})

export default Detail;