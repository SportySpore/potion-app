import axios from 'axios';

export const postMagic = async (order) => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
            "accepts":"application/json"
        }
    }

    try {
        const res = await axios.post('/api/magic', order, config);
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

