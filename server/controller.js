let historyID = 1
let historyArr = []



module.exports = {
    addNumbers: (req, res) => {
        let {num1, num2} = req.params
        let sum = Number(num1) + Number(num2)
        res.status(200).send(sum.toString())
    },

    subNumbers: (req, res) => {
        let {num1, num2} = req.params
        let sum = Number(num1) - Number(num2)
        res.status(200).send(sum.toString())
    },

    multNumbers: (req, res) => {
        let {num1, num2} = req.params
        let sum = Number(num1) * Number(num2)
        res.status(200).send(sum.toString())
    },

    divNumbers: (req, res) => {
        let {num1, num2} = req.params
        let sum = Number(num1) / Number(num2)
        res.status(200).send(sum.toString())
    },

    addHistory: (req, res) => {
        let historyObj = {
            equation: req.body.equation,
            ID: historyID
        }
        historyArr.push(historyObj)
        historyID++
        res.status(200).send(historyArr)
    },
    deleteHistory: (req, res) => {
        let match = +req.params.ID
        let index = historyArr.findIndex((el) => {
                return el.ID === match
        })

        historyArr.splice(index,1)
        res.status(200).send(historyArr)
    }
}