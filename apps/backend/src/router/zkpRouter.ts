import { Router, Request, Response } from "express";
import { generateProof, verifyProof } from "../utils/zkpUtils";

const zkpRouter = Router();

zkpRouter.post(
  "/verify-proof",
  async (req: Request, res: Response): Promise<any> => {
    const { proof, publicSignals } = req.body;

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
