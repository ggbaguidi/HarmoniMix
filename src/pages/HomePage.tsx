import React from 'react';
import { useState } from 'react';
import SectionTitle from '../components/SectionTitle/index';
import SongItem from '../components/SongItem/index';
import SearchBar from '../components/SearchBar/index';
import CreatePlaylistForm from '../components/CreatePlaylistForm/index';
import axios, { AxiosResponse } from 'axios';
import './style.css';
import { useSelector } from 'react-redux';
import TopNavBar from '../components/TopNavBar';

// HomePage component function
const HomePage = () => {
    // Get the access token from the Redux state
    const { accessTokenBearer } = useSelector((state: any) => state.token)

    // Initial state for data, selected list, and user ID
    const initialData: any = null
    const [data, setData] = useState(initialData);
    const [selectedList, setSelectedList] = useState([""]);
    const [userId, setUserId] = useState("");

    // Function to update data state
    const getData = (data: any) => {
        setData(data);
    }

    // Function to add an item to the selected list
    const pushToSelectedList = (id: string) => {
        const currentList: string[] = selectedList;
        if (currentList[0] === "") {
            currentList[0] = id;
        } else {
            currentList.push(id);
        }
        setSelectedList(currentList);
    }

    // Function to remove an item from the selected list
    const deleteFromSelectedList = (id: string) => {
        const currentList: string[] = selectedList;
        for (var i = 0; i < selectedList.length; i++) {
            if (selectedList[i] === id) {
                currentList.splice(i, 1);
            }
        }
        setSelectedList(currentList);
    }

    // Function to check the status of an item in the selected list
    const getStatus = (id: string) => {
        let status: boolean = false;
        for (var i = 0; i < selectedList.length; i++) {
            if (selectedList[i] === id) {
                status = true;
            }
        }
        return status;
    }

    // Function to get the current user ID
    const getCurrentUserId = async () => {
        try {
            const response: AxiosResponse<any> = await axios.get("https://api.spotify.com/v1/me?", {
                headers: {
                    Authorization: accessTokenBearer,
                }
            })
            setUserId(response.data.id)
        } catch (error) {
            console.error(error);
        }
    }

    // Render SongItem components based on data
    let listData;
    if (data != null) {
        listData = data.tracks.items.map((item: any) => {
            const status = getStatus(item.uri)
            return (
                <SongItem
                    type="normal"
                    key={item.id}
                    imgUrl={item.album.images[0].url}
                    songTitle={item.name}
                    artist={item.artists[0].name}
                    artistLink={item.artists[0].external_urls.spotify}
                    id={item.uri}
                    status={status}
                    pushToSelectedList={pushToSelectedList}
                    deleteFromSelectedList={deleteFromSelectedList}
                />
            )
        })
    }

    // Call the function to get the current user ID
    getCurrentUserId();

    // Render the HomePage component
    return (
        <div className="App">
            <TopNavBar title="home" />
            <CreatePlaylistForm userId={userId} selectedTracks={selectedList}></CreatePlaylistForm>
            <SectionTitle title="Search your favorite tracks!" />
            <br></br>
            <SearchBar getData={getData}></SearchBar>
            <br></br>

            <div className="grid-container">
                {listData}
            </div>

        </div>
    );
}

// Export the HomePage component for use in other files
export default HomePage;
