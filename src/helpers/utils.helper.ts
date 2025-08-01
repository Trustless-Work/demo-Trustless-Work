export const openExplorer = (walletAddress: string) => {
  if (walletAddress) {
    window.open(
      `https://stellar.expert/explorer/testnet/account/${walletAddress}`,
      "_blank"
    );
  }
};
