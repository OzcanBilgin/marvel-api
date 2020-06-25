import React, { Component } from 'react'
import { Text, View, StyleSheet, ViewStyle, Image, FlatList, ImageStyle, TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation'
import { marvelAPI } from '../api';

interface Props {
    componentId: string
}

interface State {
    dataSet: any[] | null | undefined;
    offset: number
}

export default class Welcome extends Component<Props, State> {

    state: State = {
        dataSet: null,
        offset: 0
    }

    componentDidMount() {
        this.getData()
    }

    getData = async () => {
        await marvelAPI.getCharacters({ limit: 10, offset: this.state.offset }).then((response) => {
            this.state.dataSet && this.state.dataSet.length > 0 ? this.setState({ dataSet: this.state.dataSet.concat(response.data.data.results) }) : this.setState({ dataSet: response.data.data.results })
        }).catch((err) => console.log(err))
    }

    goToScreen = (screenName: string,item: any) => {
        Navigation.push(this.props.componentId, {
            component: {
                name: screenName,
                passProps: {
                    item,
                }
            }
        })
    }
    renderRow = ({ item }: any) => {
        return (
            <TouchableOpacity style={styles.card} onPress={()=>this.goToScreen('Detail',item)}>
                <View style={styles.items}>
                    <Image
                        style={styles.image}
                        source={{uri:`${item.thumbnail.path}.${item.thumbnail.extension}`}}
                    />
                    <Text>{item.name}</Text>
                </View>      
            </TouchableOpacity>
        )
    }

    handleLoadMore = () => {
        this.setState({ offset: this.state.offset + 1 }, this.getData)
    }

    render() {
        return (
            <FlatList
                style={styles.container}
                data={this.state.dataSet}
                renderItem={this.renderRow}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={this.handleLoadMore}
                numColumns={3}
            />
        )
    }

}
interface Style {
    container: ViewStyle;
    card: ViewStyle;
    items: ViewStyle;
    image: ImageStyle;
}

const styles = StyleSheet.create<Style>({
    container: {
        marginTop: 5
    },
    card:{
         flex: 1, flexDirection: 'row'
    },
    items: {
        flex: 1,justifyContent:'center',alignItems:'center',
    },
    image: {
        height:100,
        width:100
    }
})