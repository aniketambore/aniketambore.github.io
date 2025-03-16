class LightningService {
  constructor() {
    this.lightningAddress = "anipy@blink.sv";
  }

  async createInvoice(amount) {
    console.log(`amount is ${amount}`);

    try {
      // First, get the LNURL from the lightning address
      const [username, domain] = this.lightningAddress.split("@");
      const lnurl = `https://${domain}/.well-known/lnurlp/${username}`;

      // Fetch the LNURL data
      const response = await fetch(lnurl);
      const data = await response.json();

      if (data.status === "ERROR") {
        throw new Error(data.reason || "Failed to get LNURL data");
      }

      // Create the invoice
      const params = new URLSearchParams({
        amount: amount * 1000, // Convert sats to millisats
        comment: "Tip for Aniket",
      });

      const invoiceResponse = await fetch(
        `${data.callback}?${params.toString()}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      const invoiceData = await invoiceResponse.json();

      if (invoiceData.status === "ERROR") {
        throw new Error(invoiceData.reason || "Failed to create invoice");
      }

      return invoiceData.pr; // This is the Lightning invoice
    } catch (error) {
      console.error("Error creating invoice:", error);
      throw error;
    }
  }

  getLightningAddress() {
    return this.lightningAddress;
  }
}

export const lightningService = new LightningService();
