const AWS = require('aws-sdk')
var sqs = new AWS.SQS({region: 'ap-northeast-1'})

const AWS_ACCOUNT = context.invokedFunctionArn.split(":")[4]
const QUEUE_URL = `https://sqs.ap-northeast-1.amazonaws.com/${AWS_ACCOUNT}/JobsQueue`

module.exports.SPRunner = (event, context, callback) => {


  const params = {
    MessageBody: 'SPResults',
    QueueUrl: QUEUE_URL
  }

  sqs.sendMessage(params, function(err, data) {
    if (err) {
      console.log('error:', 'Fail Send Message' + err);

      const response = {
        statusCode: 500,
        body: JSON.stringify({
          message: 'ERROR'
        })
      };

      callback(null, response);
    } else {
      console.log('data:', data.MessageId);

      const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: data.MessageId
        })
      };

      callback(null, response);
    }
  });
};
