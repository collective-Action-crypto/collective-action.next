export const truncateWallet = (walletAddress: string, digits: number) => {
  return `${walletAddress.substring(0, digits + 2)}...${walletAddress.substring(walletAddress.length - digits, walletAddress.length)}`;
}