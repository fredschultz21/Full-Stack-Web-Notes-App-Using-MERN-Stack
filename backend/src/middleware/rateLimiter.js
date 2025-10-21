import rateLimit from "../config/upstash.js"

// Create a rate limiter to refer to, and make it async
// req, res, and next are standard convention params for Express.js middleware
// req - request object from the client (var)
// res - represents response that will be sent to client (var)
// next - callback (func passed as arg to another func so we can call it when we want) to move to next middleware in chain
const rateLimiter = async (req, res, next) => {
    try {
        // const variable success is set to the result of the rate limiter object
        // doing a rate limit function which checks if you can do an action based on your limit
        // await - used inside an async func only, and used to wait for thingy to run
        const {success} = await rateLimit.limit("my-rate-limit")

        // res is the response object provided from the middleware
        if(!success) {
            return res.status(429).json({
                message:"Too many requests, please try again later"
            })
        }
        
        next();
    } catch (error) {
        console.log("Rate limit error", error)
        // next(error) makes express call error-handling middleware
        next(error);
    }
}

// So rateLimiter can be used anywhere
export default rateLimiter;