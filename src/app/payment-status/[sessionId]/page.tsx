interface PaymentStatusPageProps {
  params: Promise<{ sessionId: string }>;
}

export default async function PaymentStatusPage({
  params,
}: PaymentStatusPageProps) {
  const { sessionId } = await params;

  return (
    <main>
      <h1>Payment Status</h1>
      <p>Payment status for session {sessionId}: Completed Successfully.</p>
    </main>
  );
}
