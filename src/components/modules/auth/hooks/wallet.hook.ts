import { kit } from "@/config/wallet-kit";
import { useWalletContext } from "@/providers/wallet.provider";
import { ISupportedWallet } from "@creit.tech/stellar-wallets-kit";

export const useWallet = () => {
  const { setWalletInfo, clearWalletInfo } = useWalletContext();

  const connectWallet = async () => {
    await kit.openModal({
      modalTitle: "Connect to your favorite wallet",
      onWalletSelected: async (option: ISupportedWallet) => {
        kit.setWallet(option.id);

        const { address } = await kit.getAddress();
        const { name } = option;

        setWalletInfo(address, name);
      },
    });
  };

  const disconnectWallet = async () => {
    await kit.disconnect();
    clearWalletInfo();
  };

  const handleConnect = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnectWallet();
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }
  };

  return {
    connectWallet,
    disconnectWallet,
    handleConnect,
    handleDisconnect,
  };
};
