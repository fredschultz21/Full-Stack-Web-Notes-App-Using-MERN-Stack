import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import dotenv from "dotenv"

// dotenv is a Node.js package that allows you to load environment variables (key value pairs in format PORT=4206)
// .config() allows you to access them
dotenv.config();

// Constructs instance of RateLimit class
// An object literal with key val pairs
const ratelimit = new Ratelimit({
    // redis stores user data for how many requests have been made
    // Redis is a fast databse that stores data in RAM
    // .fromEnv() looks for connection info, in environment variables
    redis: Redis.fromEnv(),
    // Sliding window means that the time window doesn't get reset every 60 seconds,
    // but rather keeps looking back to count how many requests have been made in the past 60 seconds
    // Without it, you could do 100 requests in 60 seconds, then after the period is up, do another 100
    // instantly, effectively doing 200 per minute
    limiter: Ratelimit.slidingWindow(100, "60 s"),
});

export default ratelimit;