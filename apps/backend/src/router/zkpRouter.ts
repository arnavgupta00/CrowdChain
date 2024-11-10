import { Router, Request, Response } from "express";
import { generateProof, verifyProof } from "../utils/zkpUtils";

const zkpRouter = Router();

zkpRouter.post("/generate-proof", async (req, res) => {
  const { secret } = req.body;

  // Replace this with your known public hash
  const credentialHash = process.env.CREDENTIAL_HASH;

  try {
    const { proof, publicSignals } = await generateProof(
      secret,
      credentialHash!
    );
    res.json({ proof, publicSignals });
  } catch (error) {
    console.error("Error generating proof:", error);
    res.status(500).json({ error: "Proof generation failed" });
  }
});
zkpRouter.post(
  "/verify-proof",
  async (req: Request, res: Response): Promise<any> => {
    const { proof, publicSignals, userId } = req.body;

    try {
      const isValid = await verifyProof(proof, publicSignals);

      if (isValid) {
        return res.json({ success: true });
      } else {
        return res.json({ success: false, message: "Invalid proof" });
      }
    } catch (error) {
      console.error("Error verifying proof:", error);
      return res.status(500).json({ error: "Proof verification failed" });
    }
  }
);

export default zkpRouter;
