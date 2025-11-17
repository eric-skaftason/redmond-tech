/* 
    router - routes traffic, maps URLs to endpoints
    controller - gets req, sends res
    service - business logic, keeps controller clean, calls models
    model - interact with db
*/


module.exports = async (req, res) => {
    try {


    } catch (error) {
        res.status(500).json({ message: `Server error: ${error.message}` });
    }
}