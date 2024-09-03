const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter Task name"],
    },

    description: {
      type: String,
      required: false,
    },

    dueDate: {
      type: Date,
      required: true,
      default: 0,
    },

    priority: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: false,
    },

    subTasks: {
      type: [],
      required: false,
    },

    contacts: {
      type: [],
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
