import { Text, View, StyleSheet, TouchableOpacity, Dimensions, ImageBackground, StatusBar, FlatList } from 'react-native';
import image from '@/assets/images/house.png'
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VideoRecord from '../Video/VideoRecord';
import VideoPlayer from '../Video/VideoPlayer';


type camProp = {
    camera: string,
    records: Array<string> | undefined,
    goBack: () => void
}

export const SpecificCamRecords = (props: camProp) => {

    const [isVideoPlayerVisible, setIsVideoPlayerVisible] = useState<boolean>(false);
    const [currentLink, setCurrentLink] = useState<string>('');
    const [wasDeleted, setWasDeleted] = useState<boolean>(false);

    const deleteVideoRecordEndpoint = process.env.EXPO_PUBLIC_DELETE_RECORD;

    const back = '< Back';
    const backToList = '< Back to list'

    const linkClickHandler = (link: string) => {
        setIsVideoPlayerVisible(true);
        setCurrentLink(link);
    }

    const backToListHandler = () => {
        setIsVideoPlayerVisible(false);
    }

    const handleToWatch = (video: string) => {
        linkClickHandler(video)
        console.log('Watch', video);
    }

    const handleToDelete = async (video: string) => {
        try {
            const a = await AsyncStorage.getItem('serverIp');
            const res = await fetch(`${a}${deleteVideoRecordEndpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'video': video.split('/').pop()
                })
            })
            if (res) {
                setWasDeleted(!wasDeleted);
                console.log('Delete', video.split('/').pop());
            }
        } catch (error) {
            console.log(error);
        }

    }

    const backPressHandle = () => {
        props.goBack();
    }

    return (
        <>
            {!isVideoPlayerVisible ? (
                <View style={styles.container}>
                    <StatusBar hidden={false} backgroundColor="black" barStyle="light-content" />
                    <ImageBackground source={image} style={styles.image}>
                        <View>
                            <Text style={styles.titleText}>
                                {`${props.camera} camera records`}
                            </Text>
                            <TouchableOpacity onPress={backPressHandle}>
                                <Text style={styles.text}>{back}</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={props.records}
                            numColumns={1}
                            renderItem={({ item }) => {
                                return (
                                    <>
                                        <VideoRecord
                                            wasSelected={item === currentLink ? true : false}
                                            recordedVideo={item}
                                            pressToDelete={() => handleToDelete(item)}
                                            pressToPlay={() => handleToWatch(item)}
                                        />
                                    </>
                                )
                            }}
                        />
                    </ImageBackground>
                </View>
            ) : (
                <View style={styles.container}>
                    <StatusBar hidden={false} backgroundColor="black" barStyle="light-content" />
                    <ImageBackground source={image} style={styles.image}>
                        <View style={styles.player}>
                            <VideoPlayer videoUrl={currentLink} />
                        </View>
                        <View>
                            <TouchableOpacity onPress={backToListHandler}>
                                <Text style={styles.text}>{backToList}</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => {
                                handleToDelete(currentLink.split('/').pop());
                                backToListHandler();
                            }}>
                                <Text style={styles.deleteText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>
            )}
        </>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00000000',
        alignItems: 'center',
        justifyContent: 'center',

    },
    text: {
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 15,
        margin: 15
    },
    titleText: {
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
        margin: 20
    },
    deleteText: {
        color: '#d6040f88',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 15,
        margin: 15
    },
    image: {
        flex: 1,
        resizeMode: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    player: {
        alignSelf: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 2,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SpecificCamRecords;