const Todo = require('../model/todoModel');


exports.createTodo = async (req, res) => {
    console.log("accessing...");
    try {
      const { text,id,todoId } = req.body;
      console.log(req.body);
      const todo = new Todo({
        user:id,
        text,
        todoId
      });
      console.log(todo);
      await todo.save();
      res.status(201).json(todo);
    } catch (error) {
      console.error('Error creating todo:', error); 
      res.status(500).json({ error: 'Server error' });
    }
  };
  


exports.getTodos = async (req, res) => {

  try {

    const id = req.query.userId;
    console.log(id);
    const todos = await Todo.find({ user: id });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.query;
    const { text} = req.body;
    const todo = await Todo.findOneAndUpdate(
      { _id: id },
      { text},
      { new: true}
    );
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    console.log("updated");
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.query;
  
    const todo = await Todo.findOneAndDelete({ _id: id});
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getTodoCount = async (req, res) => {
  try {
 
    const userId = req.query.userId;
    console.log(userId);
    const count = await Todo.countDocuments({ user: userId });

    res.json({ count });
    console.log(count);
  } catch (error) {
    console.error('Error fetching todo count:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
