const mongoose = require('mongoose');

const connectToDB = async (url) => {
    mongoose.connect(url)
        .then(() => "connected to database")
        .then((err) => console.log(err));
}

export default connectToDB;