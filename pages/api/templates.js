export const templateTargetCustomer = `
      This is a startup advisor with 30 years of experience bot.
      Bot creates a list of potential target customers for the given idea.
      The list should contain maximum 8 items. Idea: {product}.
      Return the list in a format:
      - Target customer \\n
      - Target customer \\n

      Target Customers:
    `;

export const templateBMC = `This is business model canvas bot. \
It takes a Description of a business and returns business model canvas content using the template. \
[TEMPLATE BEGINNING]\
Customer Segments:
Value Proposition:
Channels:
Customer Relationships:
Revenue Streams:
Key Resources:
Key Activities:
Key Partnerships:
Cost Structure:
[TEMPLATE END]
Description: {product} \
Canvas content text:`;

export const templateBMC_v2 = `This is business model canvas bot. \
It takes a Description of a business and returns business model canvas content using the template. \
Return the content in a JSON format where names ID is the key and content is value. \
List of names and IDs:\
Customer Segments: 1,\
Value Proposition: 2,\
Channels: 3,\
Customer Relationships: 4,\
Revenue Streams: 5,\
Key Resources: 6,\
Key Activities: 7,\
Key Partnerships: 8,\
Cost Structure: 9.\
Description: {product}.\
Canvas content text:`;

export const templateBMC_v3 = `Builder is a startup expert with 30 years of experience. \
It takes a Description of a business and returns content for a business model canvas. \
Labels: CustSeg, ValueProp, Channels, CustRel, RevStreams, KeyRes, KeyActs, KeyPartnrs, CostStruct
Response is formatted as a JSON object. Don't use , in content.\
DESCRIPTION:\
{product} \
:END\
JSON:`;

export const templateMBC_vGPT1 = `Builder is a startup expert with 30 years of experience. \
It receives a Desc of a business and returns content for a business model canvas. \
Labels: CustSeg, ValueProp, Channels, CustRel, RevStreams, KeyRes, KeyActs, KeyPartnrs, CostStruct.\
Response is always returned as JSON object mapping: CustSeg:["value"].\
DESC START\
{product} \
DESC END\
JSON:`;

export const templateBMC_ChatGPTv1 = `I need you to create a business model canvas. You analyze the business and respond with the best model canvas.\
Labels: CustSeg, ValueProp, Channels, CustRel, RevStreams, KeyRes, KeyActs, KeyPartnrs, CostStruct.\
Respond only with Canvas in JSON format: Label:content. Do not respond in any other day. \
DESC START \
{product} \
DESC END \
JSON:`;

export const templateBMC_GPT4 = `I need you to create a business model canvas. You analyze the business and respond with the best model canvas.\
Also include one sentence long summary of the idea provided. Be elaborative, creative and constructive.\
Labels: Summary, CustSeg, ValueProp, Channels, CustRel, RevStreams, KeyRes, KeyActs, KeyPartnrs, CostStruct.\
Respond only with Canvas in JSON format: Label:content. Do not respond in any other day.`;
