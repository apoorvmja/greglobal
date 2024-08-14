import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { NotebookPen, NotepadText, LucideDivideCircle } from 'lucide-react';
import { useState } from 'react';

interface RecentScoresProps {
    awaScore: number;
    verbal1Score: number;
    verbal2Score: number;
    quant1Score: number;
    quant2Score: number;
    onSectionChange: (section: string) => void
}


const RecentScores: React.FC<RecentScoresProps> = ({ awaScore, verbal1Score, verbal2Score, quant1Score, quant2Score, onSectionChange }) => {
    const [section, setSection] = useState('')

    return (
        <div className="space-y-8">
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    {/* <AvatarImage src="/avatars/01.png" alt="Avatar" /> */}
                    <AvatarFallback><NotebookPen /></AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Analytical Writing</p>
                    <button onClick={() => onSectionChange('awareview')} className="text-sm text-muted-foreground">
                        Review
                    </button>
                </div>
                <div className="ml-auto font-medium">{awaScore}</div>
            </div>
            <div className="flex items-center">
                <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
                    {/* <AvatarImage src="/avatars/02.png" alt="Avatar" /> */}
                    <AvatarFallback><NotepadText /></AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Section Verbal 1</p>
                    <button onClick={() => onSectionChange('verbal1review')} className="text-sm text-muted-foreground">
                        Review
                    </button>
                </div>
                <div className="ml-auto font-medium">{65 + verbal1Score}</div>
            </div>
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    {/* <AvatarImage src="/avatars/03.png" alt="Avatar" /> */}
                    <AvatarFallback><NotepadText /></AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Section Verbal 2</p>
                    <button onClick={() => onSectionChange('verbal2review')} className="text-sm text-muted-foreground">
                        Review
                    </button>
                </div>
                <div className="ml-auto font-medium">{65 + verbal2Score}</div>
            </div>
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    {/* <AvatarImage src="/avatars/04.png" alt="Avatar" /> */}
                    <AvatarFallback><LucideDivideCircle /></AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Section Quant 1</p>
                    <button onClick={() => onSectionChange('quantitative1review')} className="text-sm text-muted-foreground">
                        Review
                    </button>
                </div>
                <div className="ml-auto font-medium">{65 + quant1Score}</div>
            </div>
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    {/* <AvatarImage src="/avatars/05.png" alt="Avatar" /> */}
                    <AvatarFallback><LucideDivideCircle /></AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Section Quant 2</p>
                    <button onClick={() => onSectionChange('quantitative2review')} className="text-sm text-muted-foreground">
                        Review
                    </button>
                </div>
                <div className="ml-auto font-medium">{65 + quant2Score}</div>
            </div>
        </div>
    );
}

export default RecentScores;