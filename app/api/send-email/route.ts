import { NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const RESEND_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ message: "Resend API key is not configured." }, { status: 500 })
  }

  try {
    const formData = await request.formData()
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    // Basic validation
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json({ message: "Please fill in all required fields." }, { status: 400 })
    }

    // Add contact to Resend audience
    if (RESEND_AUDIENCE_ID) {
      try {
        await resend.contacts.create({
          email: email,
          first_name: firstName,
          last_name: lastName,
          unsubscribed: false,
          audienceId: RESEND_AUDIENCE_ID,
        })
        console.log(`Contact ${email} added to Resend audience.`)
      } catch (error) {
        console.error("Failed to add contact to Resend audience:", error)
        // Continue with email sending even if contact addition fails
      }
    } else {
      console.warn("RESEND_AUDIENCE_ID is not set. Skipping contact addition.")
    }

    // Send email
    const { data, error } = await resend.emails.send({
      from: "BISCENIC Contact Form <onboarding@resend.dev>", // Replace with your verified Resend domain
      to: "biscenic@gmail.com", // Replace with your recipient email
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })

    if (error) {
      console.error("Error sending email:", error)
      return NextResponse.json({ message: "Failed to send message.", error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: "Message sent successfully!", data: data }, { status: 200 })
  } catch (error) {
    console.error("Unexpected error in API route:", error)
    return NextResponse.json(
      { message: "An unexpected error occurred.", error: (error as Error).message },
      { status: 500 },
    )
  }
}
