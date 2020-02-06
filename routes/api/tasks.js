const Express = require("express");
const router = Express.Router();
const Tasks = require("../../models/tasks");


//CORS
router.use((req, res, next) => {
  if (req.path !== '/' && !req.path.includes('.')) {
    res.header({
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': req.headers.origin || '*',
      'Access-Control-Allow-Headers': 'X-Requested-With',
      'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE',
      'Content-Type': 'application/json; charset=utf-8'
    })
  }
  next();
})

// read all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Tasks.find();
    res.json(tasks);
  } catch {
    res.status(500).json("Server Error");
  }
});

//read one task
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Tasks.findOne({ _id: id });
    if (!task) return res.status(404).json("Cannot find task");
    res.json(task);
  } catch (error) {
    console.log(error.message);
    // res.status(500).json("Server Error");
  }
});

// create task
router.post("/", async (req, res) => {
  try {
    const { taskName, taskDescription } = req.body;
    const task = new Tasks({
      name: taskName || "",
      description: taskDescription || ""
    });
    await task.save();
    res.status(200).json("Saved task");
    // res.redirect("./");
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Task not saved");
  }
});

// update task
router.put("/:id", async (req, res) => {
  try {
    const { taskName, taskDescription } = req.body;
    const id = req.params.id;

    const task = await Tasks.findOne({ _id: id });
    if (!task) return res.status(404).json("Cannot find task");

    task.name = taskName;
    task.description = taskDescription;
    task.updatedAt = Date.now();

    await task.save();

    res.status(200).json("Saved task");
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Task not saved");
  }
});

// delete task
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Tasks.findOne({ _id: id });
    if (!task) return res.status(404).json("Cannot find task");
    await task.remove();
    res.json("Task Removed");
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
