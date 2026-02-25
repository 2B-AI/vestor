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
  Twitter,
  Github,
  Instagram,
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
    twitterHandle: "",
    githubHandle: "",
    instagramHandle: "",
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
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-2 flex items-center gap-3">
          <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-xl">
            <PlusCircle className="text-primary h-5 w-5" />
          </div>
          <h1 className="text-3xl font-black">Submit a Meme</h1>
        </div>
        <p className="text-muted-foreground mb-8">
          Got the next big meme coin idea? Submit it for free and let the
          community decide.
        </p>
      </motion.div>

      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-grid space-y-4 rounded-2xl p-10 text-center"
        >
          <div className="bg-neon/10 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
            <CheckCircle2 className="text-neon h-8 w-8" />
          </div> 
          <h2 className="text-2xl font-black">Meme Submitted!</h2>
          <p className="text-muted-foreground mx-auto max-w-md">
            Your meme{" "}
            <span className="text-foreground font-bold">{form.name}</span> (
            {form.ticker}) has been submitted for review. You&apos;ll be notified when it
            is approved by the system.
          </p>
          <div className="bg-grid inline-block rounded-xl p-4">
            <p className="text-muted-foreground mb-1 text-xs tracking-widest uppercase">
              Estimated Approval Time
            </p>
            <p className="text-primary text-lg font-bold">
              ~36 hours
            </p>
          </div>
          <div className="pt-4">
            <Button
              onClick={() => {
                setSubmitted(false);
                setForm({
                  name: "",
                  ticker: "",
                  description: "",
                  tokenSupply: "",
                  image: null,
                  twitterHandle: "",
                  githubHandle: "",
                  instagramHandle: "",
                });
                setImagePreview(null);
              }}
              variant="outline"
              className="rounded-full px-6"
            >
              <Sparkles className="mr-2 h-4 w-4" />
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
          className="bg-grid space-y-6 rounded-2xl p-6 sm:p-8"
        >
          {/* Image Upload */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Meme Image / GIF</Label>
            <div
              className={`relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed transition-colors ${
                imagePreview
                  ? "border-primary/30 bg-primary/5"
                  : "border-border hover:border-primary/30 bg-secondary/30"
              }`}
              style={{ minHeight: "200px" }}
            >
              {imagePreview ? (
                <div className="relative h-64 w-full">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-full w-full rounded-xl object-contain"
                  />
                  <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/40 opacity-0 transition-opacity hover:opacity-100">
                    <p className="text-sm font-medium text-white">
                      Click to change
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 py-4">
                  <img
                    src="/memes/placeholder.svg"
                    alt="Upload placeholder"
                    className="h-auto w-full max-w-[200px] rounded-xl opacity-60"
                  />
                  <div className="text-center">
                    <p className="text-sm font-medium">
                      Drop your meme here or click to upload
                    </p>
                    <p className="text-muted-foreground mt-1 text-xs">
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </div>
                </div>
              )}
              <input
                type="file"
                accept="image/*,.gif"
                onChange={handleImageChange}
                className="absolute inset-0 cursor-pointer opacity-0"
              />
            </div>
          </div>

          {/* Name & Ticker */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Meme Name
              </Label>
              <Input
                id="name"
                placeholder="e.g. PEPEWIFHAT"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="bg-secondary/50 border-border h-12"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ticker" className="text-sm font-medium">
                Ticker Symbol
              </Label>
              <div className="relative">
                <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2 font-bold">
                  $
                </span>
                <Input
                  id="ticker"
                  placeholder="e.g. PWH"
                  value={form.ticker}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      ticker: e.target.value
                        .toUpperCase()
                        .replace(/[^A-Z]/g, ""),
                    })
                  }
                  className="bg-secondary/50 border-border h-12 pl-7 uppercase"
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
                className={`text-xs ${
                  charCount > 260
                    ? "text-warning"
                    : charCount > 280
                      ? "text-destructive"
                      : "text-muted-foreground"
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
              className="bg-secondary/50 border-border min-h-[100px] resize-none"
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
              onChange={(e) =>
                setForm({ ...form, tokenSupply: e.target.value })
              }
              className="bg-secondary/50 border-border h-12"
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
                  onClick={() =>
                    setForm({ ...form, tokenSupply: preset.value })
                  }
                  className="bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg px-3 py-1.5 text-xs font-bold transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Social Media Handles (Optional) */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium">
                Social Media Handles
              </Label>
              <span className="text-muted-foreground text-xs">(Optional)</span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {/* Twitter Handle */}
              <div className="space-y-2">
                <Label
                  htmlFor="twitter"
                  className="text-muted-foreground text-xs font-medium"
                >
                  Twitter/X Handle
                </Label>
                <div className="relative">
                  <Twitter className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                  <Input
                    id="twitter"
                    placeholder="@username"
                    value={form.twitterHandle}
                    onChange={(e) => {
                      let value = e.target.value;
                      if (value && !value.startsWith("@")) {
                        value = "@" + value;
                      }
                      setForm({ ...form, twitterHandle: value });
                    }}
                    className="bg-secondary/50 border-border h-12 pl-10"
                  />
                </div>
              </div>

              {/* GitHub Handle */}
              <div className="space-y-2">
                <Label
                  htmlFor="github"
                  className="text-muted-foreground text-xs font-medium"
                >
                  GitHub Username
                </Label>
                <div className="relative">
                  <Github className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                  <Input
                    id="github"
                    placeholder="username"
                    value={form.githubHandle}
                    onChange={(e) =>
                      setForm({ ...form, githubHandle: e.target.value })
                    }
                    className="bg-secondary/50 border-border h-12 pl-10"
                  />
                </div>
              </div>

              {/* Instagram Handle */}
              <div className="space-y-2">
                <Label
                  htmlFor="instagram"
                  className="text-muted-foreground text-xs font-medium"
                >
                  Instagram Handle
                </Label>
                <div className="relative">
                  <Instagram className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                  <Input
                    id="instagram"
                    placeholder="@username"
                    value={form.instagramHandle}
                    onChange={(e) => {
                      let value = e.target.value;
                      if (value && !value.startsWith("@")) {
                        value = "@" + value;
                      }
                      setForm({ ...form, instagramHandle: value });
                    }}
                    className="bg-secondary/50 border-border h-12 pl-10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="bg-primary/5 border-primary/10 flex items-start gap-3 rounded-xl border p-4">
            <Info className="text-primary mt-0.5 h-5 w-5 shrink-0" />
            <div className="text-muted-foreground space-y-1 text-sm">
              <p>
                Submission is{" "}
                <span className="text-foreground font-bold">free</span>. Your
                meme will enter the queue and be picked for the next available
                voting slot.
              </p>
              <p>
                If your meme doesn&apos;t win, it can be resubmitted in a future
                round by anyone.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={submitting}
            size="lg"
            className="from-primary to-solana w-full gap-2 rounded-xl bg-linear-to-r py-6 text-base font-black text-white hover:opacity-90"
          >
            {submitting ? (
              <>
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
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
