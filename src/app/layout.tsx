import { ConsoleRoast } from '@/components/chaos/ConsoleRoast'
import { NihilistCookies } from '@/components/chaos/NihilistCookies'
import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' })

export const metadata: Metadata = {
  metadataBase: new URL('https://naoimporta.vercel.app'),
  title: '⚠️ DOSSIÊ NÃO IMPORTA | Material Vazado',
  description: 'ALERTA: Contém o cadastro de pés do João Vicente, o salário do Estagiário (R$0) e provas de que o Gregório dormiu em 94% das gravações. Acesse antes do processo.',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  keywords: ['nao importa', 'porta dos fundos', 'podcast', 'humor', 'joao vicente', 'gregorio duvivier', 'fabio porchat'],
  authors: [{ name: 'Estagiário Anônimo (Demitido)', url: 'https://rettecnologia.org' }],
  creator: 'A Vítima do Porta dos Fundos',
  openGraph: {
    title: '🚨 VAZOU: Dossiê Confidencial do Não Importa',
    description: '📁 CONTÉM: Taxonomia de Pés do João Vicente (Gengibre, Tia Morta, Chuta-Coco) | Comprovante de 90min de atraso do Gregório | Áudio do Porchat gritando por 4h seguidas | DMs vazadas ("tesão nas veias") | Diagnóstico: Conjuntivite Fantasma',
    siteName: 'Dossiê Não Importa - Material Classificado',
    images: [
      {
        url: '/cover_light.png',
        width: 1200,
        height: 630,
        alt: 'CONFIDENCIAL: Não abra se for advogado do Porta',
      }
    ],
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '🔴 URGENTE: Gregório Duvivier dormiu lendo este tweet',
    description: 'Porchat já está gritando. João Vicente está olhando pro espelho. O Estagiário está atrasado. Luís (o cão) é o único trabalhando. Acesse o dossiê completo.',
    creator: '@naoimportapod',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-black text-white selection:bg-[#00ff00] selection:text-black overflow-x-hidden`}>
        {children}
        <NihilistCookies />
        <ConsoleRoast />
      </body>
    </html>
  );
}
