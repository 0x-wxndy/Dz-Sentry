"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea, Badge, Label } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { VerificationItem } from "@/types";
import { useI18n } from "@/components/i18n/locale-provider";

export function AdminPortal() {
  const { t, locale } = useI18n();
  const [queue, setQueue] = useState<VerificationItem[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [edits, setEdits] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");

  async function refresh() {
    const res = await fetch("/api/verify");
    const data = await res.json();
    setQueue(data.items || []);
  }

  useEffect(() => {
    refresh();
  }, []);

  async function upload() {
    if (!file) return;
    setBusy(true);
    setMessage("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/ingest", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      const title = data.document?.title ?? "";
      setMessage(
        locale === "ar"
          ? `تم استيعاب « ${title} » | بانتظار التحقق`
          : locale === "fr"
            ? `Ingesté « ${title} » | en attente de vérification`
            : `Ingested « ${title} » | pending verification`
      );
      setFile(null);
      await refresh();
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  async function reindex() {
    setBusy(true);
    try {
      const res = await fetch("/api/ingest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reindexFolder: true }),
      });
      const data = await res.json();
      const n = data.count ?? 0;
      setMessage(
        locale === "ar"
          ? `تمت إعادة فهرسة ${n} وثائق مصدر`
          : locale === "fr"
            ? `${n} documents sources réindexés`
            : `Reindexed ${n} source documents`
      );
      await refresh();
    } finally {
      setBusy(false);
    }
  }

  async function act(id: string, action: "approve" | "edit") {
    setBusy(true);
    try {
      await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          action,
          editedSummary: edits[id],
        }),
      });
      await refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t.admin.uploadTitle}</CardTitle>
          <CardDescription>{t.admin.uploadDesc}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <input
            type="file"
            accept=".pdf,.txt,.md"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-amber-500/20 file:text-amber-200"
          />
          <div className="flex gap-2">
            <Button onClick={upload} disabled={!file || busy}>
              {t.admin.uploadBtn}
            </Button>
            <Button variant="secondary" onClick={reindex} disabled={busy}>
              {t.admin.reindexBtn}
            </Button>
          </div>
          {message && <p className="text-sm text-amber-300/90">{message}</p>}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t.admin.queueTitle}</CardTitle>
          <CardDescription>{t.admin.queueDesc}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {queue.length === 0 && (
            <p className="text-sm text-slate-500">{t.admin.queueEmpty}</p>
          )}
          {queue.map((item) => (
            <div
              key={item.id}
              className="rounded-md border border-white/10 p-4 bg-ink-950/40 space-y-3"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-medium text-sm">{item.document_title}</span>
                <Badge>{item.sector}</Badge>
                <Badge
                  className={
                    item.status === "pending"
                      ? "text-risk-yellow"
                      : "text-risk-green"
                  }
                >
                  {item.status}
                </Badge>
              </div>
              <div>
                <Label>{t.admin.aiSummary}</Label>
                <p className="text-sm text-slate-400 mt-1">{item.ai_summary}</p>
              </div>
              <div>
                <Label>{t.admin.editBefore}</Label>
                <Textarea
                  className="mt-2"
                  value={edits[item.id] ?? item.edited_summary ?? item.ai_summary}
                  onChange={(e) =>
                    setEdits((s) => ({ ...s, [item.id]: e.target.value }))
                  }
                />
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => act(item.id, "approve")}
                  disabled={busy || item.status === "approved"}
                >
                  {t.admin.approve}
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => act(item.id, "edit")}
                  disabled={busy}
                >
                  {t.admin.saveEdit}
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
