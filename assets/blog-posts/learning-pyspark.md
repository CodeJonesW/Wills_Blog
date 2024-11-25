---
title: "Learning about PySpark"
date: "Nov 24, 2024"
excerpt: "Getting a start with big data tools."
cover_image: "/images/posts/learning-pyspark/pyspark-art.webp"
---

## Intro 🐍

I recently came across a backend software engineering opportunity where the majority of the work is Python and SQL based. The role advertised it would be nice to have experience with Spark or PySpark.

I have not worked with these technologies before, so I decided to read the [documentation](https://spark.apache.org/docs/latest/api/python/index.html) and get a feel for the tool.

## PySpark ⚡️

PySpark is the Python API for Apache Spark. It enables you to perform real-time, large-scale data processing in a distributed environment using Python.

Using less technical verbage, Pyspark allows developers to take a variety of data formats such [CSV](https://en.wikipedia.org/wiki/Comma-separated_values), [Parquet](https://en.wikipedia.org/wiki/Apache_Parquet), [ORC](https://en.wikipedia.org/wiki/Apache_ORC), [JSON](https://en.wikipedia.org/wiki/JSON), or [text](https://en.wikipedia.org/wiki/Text_file) and transform them into a RDD (Resilient Distributed Dataset) or dataframe that can be queried and manipulated using Python. - [source](https://spark.apache.org/docs/latest/sql-data-sources.html)

If you arent familiar with RDDs or dataframes - imagine an excel spreadsheet or relational database table that can be queried and manipulated using Python.

One can view a live jupiter notebook example - [here](https://mybinder.org/v2/gh/apache/spark/32232e9ed33?filepath=python%2Fdocs%2Fsource%2Fgetting_started%2Fquickstart_df.ipynb)

PySpark is popular in big data because it can scale horizontally. As the data grows, you can add more machines to the cluster to handle the increased load. This is in contrast to scaling vertically, where you would need to upgrade the hardware of a single machine to handle the increased load.

## Spark SQL 📀

"Spark SQL is a Spark module for structured data processing. Unlike the basic [Spark RDD API](https://spark.apache.org/docs/latest/rdd-programming-guide.html#basics), the interfaces provided by Spark SQL provide Spark with more information about the structure of both the data and the computation being performed. Internally, Spark SQL uses this extra information to perform extra optimizations. There are several ways to interact with Spark SQL including SQL and the Dataset API. When computing a result, the same execution engine is used, independent of which API/language you are using to express the computation. This unification means that developers can easily switch back and forth between different APIs based on which provides the most natural way to express a given transformation." - [source](https://spark.apache.org/docs/latest/sql-programming-guide.html)

In simpler terms users can choose to use built in Spark operations like map, filter, join, groupBy, and sortByKey to manipulate an RDD. Alternatively, they can use SQL queries to manipulate dataframes. Using SQL queries offers more data to Spark SQL to optimize the query to be more efficient.

When working with extremely large datasets, the optimizations that Spark SQL provides can be the difference between a query taking minutes or hours to run.

## Wip 🚧

This next section is a work in progess. I am currently researching how Spark SQL can optimize queries to run more efficiently. I will continually update this section with my findings.

Imagine we have a dataset containing 1 billion rows of user transaction data stored in CSV files spread across an unoptimized cluster. Let's say the dataset is around 5 TB in size.

```sql
SELECT user_id, SUM(transaction_amount) AS total_spent
FROM transactions
WHERE transaction_date >= '2024-01-01'
GROUP BY user_id
ORDER BY total_spent DESC
LIMIT 100;
```

This query involves:

- Filtering (WHERE transaction_date >= '2024-01-01'): Reads data from many nodes and applies a filter.
- Aggregation (SUM(transaction_amount)): Requires collecting and summing data by user_id, potentially shuffling massive amounts of data across the network.
- Sorting (ORDER BY total_spent DESC): A costly operation for large datasets as it requires a full distributed sort.
- Limiting (LIMIT 100): Even though we only want 100 results, Spark processes the entire dataset first before selecting the top 100.

When Could It Take Hours?

1. Inefficient Storage: If the data is stored in CSV, the entire dataset must be read and parsed. Using Parquet or ORC could significantly reduce read time by enabling Spark to skip irrelevant data.
2. Large Shuffle: Grouping by user_id requires moving data across nodes, which is slow if there are many unique user_id values and the cluster lacks network bandwidth.
3. Insufficient Resources: If the cluster has limited nodes, memory, or compute power, Spark will spill data to disk, causing significant slowdowns.
4. No Partitioning: Without proper partitioning (e.g., by transaction_date), Spark will read all 5 TB, even if only a small portion is relevant.

Simulation of the above query using PySpark:

```python
from pyspark.sql import SparkSession
from pyspark.sql.functions import rand, expr

# Initialize Spark session
spark = SparkSession.builder \
    .appName("Large Dataset Optimization") \
    .config("spark.sql.shuffle.partitions", "200") \
    .getOrCreate()

# Generate synthetic data using Spark
df = spark.range(0, 10**8).select(
    (rand() * 1000000).cast("int").alias("user_id"),
    rand().alias("transaction_amount"),
    expr("concat('2023-', cast(floor(rand() * 12 + 1) as string), '-', cast(floor(rand() * 28 + 1) as string))").alias("transaction_date")
)

# Write data to Parquet with partitioning and compression
df.write \
    .partitionBy("transaction_date") \
    .option("compression", "snappy") \
    .mode("overwrite") \
    .parquet("optimized_transactions_parquet")

# Read the data back
transactions = spark.read.parquet("optimized_transactions_parquet")

# Query the dataset with predicate pushdown and aggregation
result = transactions.filter("transaction_date >= '2023-01-01'") \
    .groupBy("user_id") \
    .sum("transaction_amount") \
    .orderBy("sum(transaction_amount)", ascending=False) \
    .limit(100)

# Show the results
result.show()
```

### Why Is This Optimized?

1. Efficient Data Generation:

   - Data is generated using Spark's distributed processing, which avoids memory issues in Python.

2. Partitioning:
   - Partitioning by transaction_date improves predicate pushdown, reducing the amount of data read.
3. Compressed Storage:

   - Using Snappy compression reduces disk I/O and speeds up data reading.

4. Shuffle Partitioning:
   - The number of shuffle partitions (spark.sql.shuffle.partitions) is tuned for the cluster size, reducing overhead during aggregations.
5. Scalability:
   - The setup is designed to handle larger datasets (e.g., TBs) more effectively without bottlenecks.

### Potential Results

- Small Dataset (10 GB):
  - Query executes in seconds to minutes.
- Large Dataset (1 TB):
  - Query takes several minutes.
- Massive Dataset (10+ TB):
  - Query could take hours on an unoptimized cluster but would run faster with proper partitioning, bucketing, and resources.

## Conclusion 🎬

While researching this article, I found [Jack Laskowski's writing](https://jaceklaskowski.gitbooks.io/mastering-spark-sql/content/) to be extremely helpful. Tonight I made it through the basics of Apache Spark's documentation and the beginning of Jack's book - Mastering Spark SQL.

On his initial page Jack cites a quote by Flannery O'Conner - _'I write to discover what I know.'_

I resonated with this quote strongly. Writing forces me to think and refine my understanding of a topic until I can explain it with simplicity. Finding that I am not alone in using this process is reassuring and affirms that I am on the right path to advancing my knowledge continuously.

Cheers!

### More Resources 👏

- [Hive Apache](https://hive.apache.org/)
- [Testing PySpark](https://spark.apache.org/docs/latest/api/python/getting_started/testing_pyspark.html)
- [Apache Spark](https://spark.apache.org/docs/latest/index.html)
- [Mastering Spark SQL](https://jaceklaskowski.gitbooks.io/mastering-spark-sql/content/)
- [Spark SQL Programming Guide](https://spark.apache.org/docs/latest/sql-programming-guide.html)
- [Spark SQL Performance Tuning](https://spark.apache.org/docs/latest/sql-performance-tuning.html)
- [Spark SQL Syntax Guide](https://spark.apache.org/docs/latest/sql-ref-syntax.html)
