import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type {
  AbstractAdditionalInfo,
  ArticleAdditionalInfo,
  BookAdditionalInfo,
  ConferenceAdditionalInfo,
  DissertationAdditionalInfo,
  ManualAdditionalInfo,
  MethodicalAdditionalInfo,
  ReportAdditionalInfo,
  Resource,
} from '@/types/api';
import { formatDateIntl } from '@/utils';

interface ResourceTypeDetailsProps {
  resource: Resource;
}

export function ResourceTypeDetails({ resource }: ResourceTypeDetailsProps) {
  // Render details based on resource type
  const renderTypeSpecificDetails = () => {
    if (!resource.additionalInfo) {
      return <div className="text-muted-foreground">Додаткова інформація відсутня</div>;
    }

    switch (resource.resourceType.name) {
      case 'Книга': {
        const bookInfo = resource.additionalInfo as BookAdditionalInfo;
        return (
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">ISBN</dt>
              <dd>{bookInfo.ISBN}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Видавництво</dt>
              <dd>{bookInfo.publisher}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Кількість сторінок</dt>
              <dd>{bookInfo.numberOfPages}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Мова видання</dt>
              <dd>{bookInfo.language}</dd>
            </div>
            {bookInfo.edition && (
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Видання</dt>
                <dd>{bookInfo.edition}</dd>
              </div>
            )}
          </dl>
        );
      }

      case 'Стаття': {
        const articleInfo = resource.additionalInfo as ArticleAdditionalInfo;
        return (
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Назва журналу</dt>
              <dd>{articleInfo.journalName}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Том</dt>
              <dd>{articleInfo.volume}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Номер випуску</dt>
              <dd>{articleInfo.issue}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Кількість кторінок</dt>
              <dd>{articleInfo.pages}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">DOI</dt>
              <dd>{articleInfo.DOI}</dd>
            </div>
          </dl>
        );
      }

      case 'Методичні матеріали': {
        const methodicalInfo = resource.additionalInfo as MethodicalAdditionalInfo;
        return (
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Назва курсу</dt>
              <dd>{methodicalInfo.courseName}</dd>
            </div>
            {methodicalInfo.subject && (
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Предмет</dt>
                <dd>{methodicalInfo.subject}</dd>
              </div>
            )}
            {methodicalInfo.academicYear && (
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Академічний рік</dt>
                <dd>{methodicalInfo.academicYear}</dd>
              </div>
            )}
          </dl>
        );
      }

      case 'Посібник': {
        const manualInfo = resource.additionalInfo as ManualAdditionalInfo;
        return (
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            {manualInfo.version && (
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Версія посібника</dt>
                <dd>{manualInfo.version}</dd>
              </div>
            )}
            {manualInfo.publisher && (
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Видавництво</dt>
                <dd>{manualInfo.publisher}</dd>
              </div>
            )}
            {manualInfo.language && (
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Мова</dt>
                <dd>{manualInfo.language}</dd>
              </div>
            )}
          </dl>
        );
      }

      case 'Конференційний матеріал': {
        const conferenceInfo = resource.additionalInfo as ConferenceAdditionalInfo;
        return (
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Назва конференції</dt>
              <dd>{conferenceInfo.conferenceName}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Місце проведення</dt>
              <dd>{conferenceInfo.location}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Дата проведення</dt>
              <dd>{formatDateIntl(conferenceInfo.conferenceDate)}</dd>
            </div>
          </dl>
        );
      }

      case 'Дисертація': {
        const dissertationInfo = resource.additionalInfo as DissertationAdditionalInfo;
        return (
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Науковий ступінь</dt>
              <dd>{dissertationInfo.degree}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Ім&apos;я наукового керівника
              </dt>
              <dd>{dissertationInfo.advisor}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Назва навчального закладу
              </dt>
              <dd>{dissertationInfo.institution}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Дата захисту</dt>
              <dd>{formatDateIntl(dissertationInfo.defenseDate)}</dd>
            </div>
          </dl>
        );
      }

      case 'Реферат': {
        const abstractInfo = resource.additionalInfo as AbstractAdditionalInfo;
        return (
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Тема</dt>
              <dd>{abstractInfo.topic}</dd>
            </div>
            {abstractInfo.summary && (
              <div className="col-span-2">
                <dt className="text-sm font-medium text-muted-foreground">
                  Короткий виклад або резюме
                </dt>
                <dd className="whitespace-pre-line">{abstractInfo.summary}</dd>
              </div>
            )}
          </dl>
        );
      }

      case 'Звіт': {
        const reportInfo = resource.additionalInfo as ReportAdditionalInfo;
        return (
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Назва організації</dt>
              <dd>{reportInfo.organization}</dd>
            </div>
            {reportInfo.reportNumber && (
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Номер звіту</dt>
                <dd>{reportInfo.reportNumber}</dd>
              </div>
            )}
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Дата подання</dt>
              <dd>{formatDateIntl(reportInfo.reportDate)}</dd>
            </div>
          </dl>
        );
      }

      default:
        return <div className="text-muted-foreground">Додаткова інформація відсутня</div>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Додаткова інформація</CardTitle>
      </CardHeader>
      <CardContent>{renderTypeSpecificDetails()}</CardContent>
    </Card>
  );
}
