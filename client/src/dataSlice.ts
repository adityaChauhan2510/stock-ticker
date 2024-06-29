import { createSlice } from '@reduxjs/toolkit';


const initialState: any = {
    data: []
};


const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setData(state, action) {
            Object.keys(action.payload).forEach((key: string) => {
                const stockObj = { [key]: action.payload[key] }
                state.data = [...state.data.filter((item: any) => !item.hasOwnProperty(key)), stockObj];
                
            });
        }

    }
});


export const { setData } = dataSlice.actions;
export default dataSlice.reducer;