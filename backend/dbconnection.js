const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://gunjangarg349:0P4UNtu3S1YtQrGL@cluster0.bn1ylnd.mongodb.net/chitchat-db?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(
    err => console.log(err)
);

