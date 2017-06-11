import mongoose, {Schema} from 'mongoose';

const ChatSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true
  },
  content: [
    {
      author: {
        type: String,
        required: true
      },
      data: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Chat', ChatSchema);
