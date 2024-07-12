import {
  Transaction,
  SystemProgram,    
  Connection,
  clusterApiUrl,
  PublicKey,  
} from "@solana/web3.js";

export const main = async (req) => {  
  const { method } = req;

  const metaData = [
    ["Content-Type", "application/json"],
    ["Access-Control-Allow-Origin", "*"],
    ["Access-Control-Allow-Methods", ["GET","POST","OPTIONS"]],
    ["Access-Control-Allow-Headers", ["content-type","accept-encoding","authorization"]],
  ];

  if (method === "POST") {
    const account = new PublicKey(req.body.account);

    let transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: account,
        toPubkey: new PublicKey("5si22HeJ67E1tKtNkeHEz6FijzmL46VdsrS2LoidYJYH"),
        lamports: 100000000,
      })
    );

    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const blockHash = (await connection.getLatestBlockhash("finalized"))
      .blockhash;
    transaction.feePayer = account;
    transaction.recentBlockhash = blockHash;

    const serializedTransaction = transaction.serialize({
      requireAllSignatures: false,
      verifySignatures: true,
    });
    const transactionBase64 = serializedTransaction.toString("base64");

    const resp = {
      transaction: transactionBase64,
      message: "Send me one SOL",
    };
    const body = JSON.stringify(resp);
    return { body: body, headers:metaData };
  } else {
    console.log("IN GET BLOCsK");
    const resp = {};
    resp.icon =
      "https://bafybeiding7lugfdazpzcmffwv4tr3xppypbrcw5ahn7llxnvn64gfy7ji.ipfs.w3s.link/";
    resp.title = "Actions on Fleek";
    resp.description = "Deploy your actions on fleek network";
    resp.label = "Activate Action";

    return { body: JSON.stringify(resp), headers:metaData  };
  }
};
