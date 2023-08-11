const makeSale = (callback) => {
  if (currencyId === '') {
    setEmpty("Please select currency");
  } else {
    dispatch(postSale({
      adminPortalUserId: userID,
      bundleId: postBundleId,
      businessPartnerId,
      currencyId,
      order: {
        amount: total,
        dateCreated: today,
        discount: disc,
        payingAccountNumber: "TelOne",
        quantity: totalQty,
        vat: valueAddedTax
      },
      shopId
    })).then(response => {
      if (response.success) {
        var todayDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
        setCurrentDate(todayDate);
        console.log(todayDate);
        setPrintState(true);
        callback();

        // Execute postVoucherSaleByBundleId
        saleByBundle(postBundleId, totalQty);
      } else {
        // Handle the case when postSale is not successful
        console.log('postSale failed');
      }
    }).catch(error => {
      // Handle any errors that occurred during postSale dispatch
      console.error('Error during postSale:', error);
    });
  }
};






const generatePDF = () => {
  // Create a new jsPDF instance
  const doc = new jsPDF();

  // Define the content and formatting of your table
  const tableData = [
    ['Product 1', 10, 20, 200],
    ['Product 2', 5, 10, 50],
    ['Product 3', 8, 15, 120],
    // Add more rows as needed
  ];

  const columns = ['Product', 'Quantity', 'Price', 'Total'];

  const options = {
    startY: 20, // Specify the starting position of the table
  };

  // Add the table to the PDF document
  doc.autoTable(columns, tableData, options);

  // Calculate the total, subtotal, discount, and VAT
  const subtotal = tableData.reduce((acc, [, , price]) => acc + price, 0);
  const discount = subtotal * 0.1; // Assuming a 10% discount
  const vat = subtotal * 0.2; // Assuming a 20% VAT
  const total = subtotal - discount + vat;

  // Add the total, subtotal, discount, and VAT rows at the bottom
  doc.autoTable({
    startY: doc.previousAutoTable.finalY + 10, // Start the new table below the previous one
    head: [['', '', 'Subtotal', subtotal.toFixed(2)]],
    body: [
      ['', '', 'Discount', discount.toFixed(2)],
      ['', '', 'VAT', vat.toFixed(2)],
      ['', '', 'Total', total.toFixed(2)],
    ],
    theme: 'grid',
    styles: {
      halign: 'right',
      fontStyle: 'bold',
    },
  });

  // Save the PDF
  doc.save('table.pdf');
};