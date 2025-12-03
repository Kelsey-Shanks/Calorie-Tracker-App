import express from "express";
import cors from "cors";

const PORT = process.env.PORT || 5500;
const app = express();
app.use(express.json());

app.use(cors());
app.options("*", cors()); // enable preflight for all routes

async function sum_calculation(num_list) {
  const sum = num_list.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  return sum;
}

app.post("/sum-calculation", async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      error:
        "Request body is empty.  Expectd JSON like: { 'num_list': [1,2,3] }",
    });
  }
  const { num_list } = req.body;

  if (num_list === undefined) {
    return res.status(400).json({
      error:
        "Missing 'num_list' field.  Expected JSON: { 'num_list': [1,2,3] }",
    });
  }

  if (!Array.isArray(num_list)) {
    return res.status(400).json({
      error: "'num_list' must be an array. Example: { 'num_list': [1, 2, 3] }",
    });
  }

  if (num_list.length === 0) {
    return res.status(400).json({
      error: "'num_list' cannot be empty. Provide at least one number.",
    });
  }

  for (let i = 0; i < num_list.length; i++) {
    const value = num_list[i];

    if (typeof value !== "number" || Number.isNaN(value)) {
      return res.status(400).json({
        error: `Invalid value at index ${i}: '${value}'. All elements must be valid numbers.`,
      });
    }
  }

  const total_sum = await sum_calculation(num_list);
  return res.json({ sum: total_sum });
});

app.listen(PORT, async () => {
  console.log(`Sum_Calculation services running on port ${PORT}...`);
});
