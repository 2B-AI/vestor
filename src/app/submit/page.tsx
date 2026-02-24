"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useWallet } from "@/lib/wallet-context";
import {
  PlusCircle,
  Upload,
  Wallet,
  CheckCircle2,
  Image as ImageIcon,
  Sparkles,
  Info,
  Zap,
} from "lucide-react";

export default function SubmitPage() {
  const { connected, connect } = useWallet();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    ticker: "",
    description: "",
    tokenSupply: "",
    image: null as File | null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm({ ...form, image: file });
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!connected) {
      connect();
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  const charCount = form.description.length;

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <PlusCircle className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-3xl font-black">Submit a Meme</h1>
        </div>
        <p className="text-muted-foreground mb-8">
          Got the next big meme coin idea? Submit it for free and let the community decide.
        </p>
      </motion.div>

      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-2xl p-10 text-center space-y-4"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neon/10 mx-auto">
            <CheckCircle2 className="h-8 w-8 text-neon" />
          </div>
          <h2 className="text-2xl font-black">Meme Submitted!</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Your meme <span className="text-foreground font-bold">{form.name}</span> ({form.ticker}) is now in the queue.
            You&apos;ll be notified when it enters a voting round.
          </p>
          <div className="glass-card rounded-xl p-4 inline-block">
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Estimated Slot</p>
            <p className="text-lg font-bold text-primary">~2-3 rounds from now</p>
          </div>
          <div className="pt-4">
            <Button
              onClick={() => {
                setSubmitted(false);
                setForm({ name: "", ticker: "", description: "", tokenSupply: "", image: null });
                setImagePreview(null);
              }}
              variant="outline"
              className="rounded-full px-6"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Submit Another
            </Button>
          </div>
        </motion.div>
      ) : (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="glass-card rounded-2xl p-6 sm:p-8 space-y-6"
        >
          {/* Image Upload */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Meme Image / GIF</Label>
            <div
              className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed transition-colors cursor-pointer overflow-hidden ${
                imagePreview
                  ? "border-primary/30 bg-primary/5"
                  : "border-border hover:border-primary/30 bg-secondary/30"
              }`}
              style={{ minHeight: "200px" }}
            >
              {imagePreview ? (
                <div className="relative w-full h-64">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-xl">
                    <p className="text-white text-sm font-medium">Click to change</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 py-4">
                  <img
                    src="/memes/placeholder.svg"
                    alt="Upload placeholder"
                    className="w-full max-w-[200px] h-auto opacity-60"
                  />
                  <div className="text-center">
                    <p className="text-sm font-medium">Drop your meme here or click to upload</p>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG, GIF up to 5MB</p>
                  </div>
                </div>
              )}
              <input
                type="file"
                accept="image/*,.gif"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* Name & Ticker */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Meme Name
              </Label>
              <Input
                id="name"
                placeholder="e.g. PEPEWIFHAT"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="h-12 bg-secondary/50 border-border"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ticker" className="text-sm font-medium">
                Ticker Symbol
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">
                  $
                </span>
                <Input
                  id="ticker"
                  placeholder="e.g. PWH"
                  value={form.ticker}
                  onChange={(e) =>
                    setForm({ ...form, ticker: e.target.value.toUpperCase().replace(/[^A-Z]/g, "") })
                  }
                  className="h-12 bg-secondary/50 border-border pl-7 uppercase font-mono"
                  maxLength={10}
                  required
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="description" className="text-sm font-medium">
                Description / Pitch
              </Label>
              <span
                className={`text-xs font-mono ${
                  charCount > 260 ? "text-warning" : charCount > 280 ? "text-destructive" : "text-muted-foreground"
                }`}
              >
                {charCount}/280
              </span>
            </div>
            <Textarea
              id="description"
              placeholder="Sell the community on your meme coin in 280 characters or less..."
              value={form.description}
              onChange={(e) => {
                if (e.target.value.length <= 280) {
                  setForm({ ...form, description: e.target.value });
                }
              }}
              className="min-h-[100px] bg-secondary/50 border-border resize-none"
              required
            />
          </div>

          {/* Token Supply */}
          <div className="space-y-2">
            <Label htmlFor="supply" className="text-sm font-medium">
              Total Token Supply
            </Label>
            <Input
              id="supply"
              type="number"
              placeholder="e.g. 1000000000"
              value={form.tokenSupply}
              onChange={(e) => setForm({ ...form, tokenSupply: e.target.value })}
              className="h-12 bg-secondary/50 border-border font-mono"
              min="1"
              required
            />
            <div className="flex gap-2">
              {[
                { label: "100M", value: "100000000" },
                { label: "500M", value: "500000000" },
                { label: "1B", value: "1000000000" },
                { label: "420.69M", value: "420690000" },
              ].map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setForm({ ...form, tokenSupply: preset.value })}
                  className="rounded-lg bg-secondary/50 px-3 py-1.5 text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="rounded-xl bg-primary/5 border border-primary/10 p-4 flex items-start gap-3">
            <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground space-y-1">
              <p>
                Submission is <span className="text-foreground font-bold">free</span>. Your meme will enter the queue
                and be picked for the next available voting slot.
              </p>
              <p>
                If your meme doesn&apos;t win, it can be resubmitted in a future round by anyone.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={submitting}
            size="lg"
            className="w-full bg-gradient-to-r from-primary to-solana hover:opacity-90 text-white font-black text-base rounded-xl py-6 gap-2"
          >
            {submitting ? (
              <>
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Submitting...
              </>
            ) : connected ? (
              <>
                <Zap className="h-5 w-5" />
                Submit Meme
              </>
            ) : (
              <>
                <Wallet className="h-5 w-5" />
                Connect Wallet to Submit
              </>
            )}
          </Button>
        </motion.form>
      )}
    </div>
  );
}
