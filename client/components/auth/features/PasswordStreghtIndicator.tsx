export function PasswordStrengthIndicator({
  strength,
  strengthText,
  strengthColor,
}: {
  strength: number
  strengthText: string
  strengthColor: string
}) {
  return (
    <div className="mt-2">
      <div className="h-2 w-full bg-gray-200 rounded">
        <div
          className={`h-2 rounded ${strengthColor}`}
          style={{ width: `${strength}%` }}
        />
      </div>
      <p className="text-xs mt-1">{strengthText}</p>
    </div>
  )
}
