import { Agent } from "@openai/agents";

const bookingAgent = new Agent({
  name: "Booking Agent",
  instructions: "Assist users in booking flights and hotels efficiently.",
})

const refundAgent = new Agent({
  name: "Refund Agent",
  instructions: "Help users with refund processes for their bookings.",
})

const customeFacingAgent = new Agent({
  name: "Customer Facing Agent",
  instructions: 'Talk to the user directly. When they need booking or refund help, call the matching tool.',
  tools: [
    bookingAgent.asTool({
      toolName: "booking_service",
      toolDescription: "Handles flight and hotel bookings for users."
    }),
    refundAgent.asTool({
      toolName: "refund_service",
      toolDescription: "Manages refund requests for user bookings."
    }),
  ]
})

export { bookingAgent, refundAgent, customeFacingAgent };