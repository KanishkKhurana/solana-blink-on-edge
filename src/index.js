import {
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  ComputeBudgetProgram,
  Connection,
  clusterApiUrl,
  PublicKey,
  TransactionInstruction,
} from "@solana/web3.js";

export const main = async (req) => {
  console.log(req);
  const { method, path } = req;

  const metaData = {
    title: `Solana Blinks on Fleek`,
    description: `Solana Blinks on Fleek`,    
  };

  if (path === "/actions.json") {
    return {
      rules: [
        {
          pathPattern: "/",
          apiPath: "/",
        },
      ],
      header: metaData,
    };
  }

  if (method == "GET") {
    console.log("IN GET BLOCsK");
    const resp = {};
    resp.icon =
      "https://t3.ftcdn.net/jpg/05/59/27/48/360_F_559274893_O9iSRQwTKIkAooNTglilMgx2yMcXK9Or.jpg";
    resp.title = "Actions on Fleek";
    resp.description = "Deploy your actions on fleek network";
    resp.label = "Activate Action";

    return { status: 200, body: JSON.stringify(resp), headers: [] };
  } else if (method == "POST") {
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

    return { transaction: transactionBase64, message: "Send me one SOL" };
  }
};
