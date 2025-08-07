import { Badge } from "@/components/ui/badge";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { useTabsContext } from "@/providers/tabs.provider";
import { SingleReleaseEscrow } from "@trustless-work/escrow/types";
import { MultiReleaseEscrow } from "@trustless-work/escrow/types";
import {
  AlertCircle,
  AudioWaveform,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileCodeIcon as FileContract,
  GalleryHorizontalEnd,
  Handshake,
} from "lucide-react";
import Link from "next/link";

interface HeaderSectionProps {
  escrow: SingleReleaseEscrow | MultiReleaseEscrow | null;
}

export const HeaderSection = ({ escrow }: HeaderSectionProps) => {
  const { activeEscrowType } = useTabsContext();

  // For multi-release escrows, check if all milestones are released/resolved/disputed
  const getMultiReleaseStatus = (escrow: MultiReleaseEscrow) => {
    const allMilestones = escrow.milestones;
    const allReleased = allMilestones.every((m) => m.flags?.released);
    const allResolved = allMilestones.every((m) => m.flags?.resolved);
    const anyDisputed = allMilestones.some((m) => m.flags?.disputed);

    return {
      released: allReleased,
      resolved: allResolved,
      disputed: anyDisputed,
    };
  };

  // Get the status flags based on escrow type
  const getStatusFlags = () => {
    if (!escrow) return null;

    if (activeEscrowType === "single-release") {
      return (escrow as SingleReleaseEscrow).flags;
    } else {
      return getMultiReleaseStatus(escrow as MultiReleaseEscrow);
    }
  };

  const statusFlags = getStatusFlags();

  return (
    <>
      <div className="flex justify-between items-start gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <FileContract className="h-5 w-5 text-primary" />
          <CardTitle>{escrow?.title}</CardTitle>

          {activeEscrowType === "single-release" && (
            <Badge variant="secondary" className="gap-2">
              <AudioWaveform />
              Single Release
            </Badge>
          )}

          {activeEscrowType === "multi-release" && (
            <Badge variant="secondary" className="gap-2">
              <GalleryHorizontalEnd />
              Multi Release
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Link
            href={`https://viewer.trustlesswork.com/${escrow?.contractId}`}
            target="_blank"
          >
            <Badge variant="outline" className="gap-2">
              <ExternalLink /> Escrow Viewer
            </Badge>
          </Link>

          <Link
            href={`https://stellar.expert/explorer/testnet/contract/${escrow?.contractId}`}
            target="_blank"
          >
            <Badge variant="outline" className="gap-2">
              <ExternalLink /> Stellar Expert
            </Badge>
          </Link>

          <Badge
            variant="outline"
            className={
              statusFlags?.released || statusFlags?.resolved
                ? "bg-green-100 text-green-800 hover:bg-green-200"
                : statusFlags?.disputed
                  ? "bg-destructive text-white hover:bg-destructive/90"
                  : ""
            }
          >
            {statusFlags?.released ? (
              <>
                <CheckCircle2 className="mr-1 h-3 w-3" /> Released
              </>
            ) : statusFlags?.resolved ? (
              <>
                <Handshake className="mr-1 h-3 w-3" /> Resolved
              </>
            ) : statusFlags?.disputed ? (
              <>
                <AlertCircle className="mr-1 h-3 w-3" /> Disputed
              </>
            ) : (
              <>
                <Clock className="mr-1 h-3 w-3" /> Working
              </>
            )}
          </Badge>
        </div>
      </div>
      <CardDescription className="text-sm mt-1">
        {escrow?.description}
      </CardDescription>
    </>
  );
};
