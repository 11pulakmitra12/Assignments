
/**
 * @swagger
 *  /generate/token:
 *    post:
 *      summary: Generate new Token.
 *      tags: [Token]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - userName
 *              properties:
 *                userName:
 *                  type: string
 *                  description: Name.
 *                  example: "Pulak"
 *                userId:
 *                  type: string
 *                  description: user unique Id.
 *                  example: "pulak@gmail.com"
 *      responses:
 *        "200":
 *          description: New Token Generated.
 *        "500":
 *           description: Token generation Failed.
 */



/**
 * @swagger
 *
 * /validate/token:
 *  get:
 *      tags: [Token]
 *      summary: "Swagger authentication."
 *      description: "Returns a simple json object."
 *      produces:
 *          -application/json
 *      responses:
 *        "200":
 *          description: Token Generated.
 *        "403":
 *           description: Token generation Failed.
 */

