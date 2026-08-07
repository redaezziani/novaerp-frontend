export default async function InvoiceDetailPage(
  props: PageProps<'/invoices/[id]'>,
) {
  const { id } = await props.params;
  return <div>Invoice {id}</div>;
}
