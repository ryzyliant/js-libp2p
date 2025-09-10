import type { ConnectionGater } from "@libp2p/interface";

/**
 * Returns a default connection gater implementation that allows everything
 */
export function connectionGater(gater: ConnectionGater = {}): ConnectionGater {
  const defaults: ConnectionGater = {
    denyDialPeer: async () => false,
    denyDialMultiaddr: async () => false,
    denyInboundConnection: async () => false,
    denyOutboundConnection: async () => false,
    denyInboundEncryptedConnection: async () => false,
    denyOutboundEncryptedConnection: async () => false,
    denyInboundUpgradedConnection: async () => false,
    denyOutboundUpgradedConnection: async () => false,
    filterMultiaddrForPeer: async () => true,
  };

  // Merge own properties and prototype methods
  const merged: ConnectionGater = { ...defaults };

  for (const key of Object.keys(defaults) as Array<keyof ConnectionGater>) {
    if (typeof gater[key] === "function") {
      // Bind the method to preserve 'this' context if it's a class method
      (merged[key] as any) = gater[key].bind(gater);
    }
  }

  return merged;
}
